class DebugTracePlugin {
  // eslint-disable-next-line class-methods-use-this
  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      'MyExampleWebpackPlugin',
      (compilation, callback) => {
        console.log('This is an example plugin!');
        console.log(
          'Here’s the `compilation` object which represents a single build of assets:',
          compilation,
        );
        callback();
      },
    );
  }
}

module.exports = DebugTracePlugin;
