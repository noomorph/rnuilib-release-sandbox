// Repository policy is separate from the release state machine. The runner is a
// port of react-native-navigation's scripts/release; only this adapter knows the
// ui-lib workspace layout, package order, and expected tarball contents.
module.exports = {
  repository: 'noomorph/rnuilib-release-sandbox',
  branch: 'master',
  workflow: '.github/workflows/release.yml',
  // Package that owns the release: Git tags, GitHub release, and version PR naming.
  packageName: '@noomorph/react-native-ui-lib',
  nativePackageName: '@noomorph/uilib-native',
  // Publication order. @noomorph/uilib-native is only published when a native version is
  // selected (or for snapshots); @noomorph/react-native-ui-lib is published in every run.
  order: ['@noomorph/uilib-native', '@noomorph/react-native-ui-lib'],
  nativeStatus: 'buildkite/react-native-ui-lib',
  nativeStatusUrl: 'https://github.com/noomorph/rnuilib-release-sandbox/actions/',
  nativeStatusCreator: { login: 'noomorph', id: 1962469 },
  label: 'release',
  packages: {
    '@noomorph/uilib-native': {
      directory: 'packages/uilib-native',
      native: true,
      allowedScripts: [],
      requiredFiles: [
        'package.json',
        'ReactNativeUiLib.podspec',
        'react-native.config.js',
        'components/index.js',
        'components/index.d.ts',
        'android/build.gradle',
        'android/src/main/AndroidManifest.xml',
        'specs/KeyboardTrackingViewNativeComponent.ts',
      ],
    },
    '@noomorph/react-native-ui-lib': {
      directory: 'packages/react-native-ui-lib',
      native: false,
      // The build copies the root scripts/ into the package; package.json#files
      // whitelists exactly these two for the shipped release-notes/docs helpers.
      allowedScripts: ['scripts/release/prReleaseNotesCommon.js', 'scripts/docs/buildDocsCommon.js'],
      requiredFiles: [
        'package.json',
        'README.md',
        'LICENSE',
        'src/index.js',
        'src/index.d.ts',
        'core.js',
        'style.js',
        'view.js',
        'testkit/package.json',
        'lib/package.json',
        'lib/ReactNativeUiLib.podspec',
        'lib/components/index.js',
        'lib/android/build.gradle',
        'scripts/release/prReleaseNotesCommon.js',
        'scripts/docs/buildDocsCommon.js',
      ],
    },
  },
};
