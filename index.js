const { spawn } = require('child_process');
const { resolve, join } = require('path');

const executable = resolve('node_modules', '.bin', 'tsc');

async function tscExecutor(options, context) {
  const tsConfigs = Array.isArray(options.tsConfig) ? options.tsConfig : [options.tsConfig];
  const libRoot = context.workspace.projects[context.projectName].root;

  const executionCodes = await Promise.all(
    tsConfigs.map(
      tsConfig =>
        new Promise(resolve => {
          const child = spawn(executable, ['--noEmit', '-p', join(libRoot, tsConfig)], {
            shell: process.platform == 'win32',
            stdio: 'inherit',
          });
          child.on('data', console.log);
          child.on('error', console.error);
          child.on('close', resolve);
        })
    )
  );

  const success = executionCodes.every(executionCode => executionCode === 0);

  return { success };
}

exports.default = tscExecutor;
