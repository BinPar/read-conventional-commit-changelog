const core = require('@actions/core');
const fs = require('fs').promises;

async function main() {
  try {
    const changelogPath = core.getInput('changelog-path') || './CHANGELOG.md';
    core.debug(`CHANGELOG Path: ${changelogPath}`);
    const versionToRetrieve = core.getInput('version') || 'latest';
    core.debug(`Version: ${versionToRetrieve}`);
    let simpleVersion = versionToRetrieve.replace(/^v/, '');
    const changelogStr = await fs.readFile(changelogPath, { encoding: 'utf-8' });
    if (simpleVersion === 'latest') {
      const versionHeaderRegExp = /### ?\[?(\d+.\d+.\d+)\]?/;
      const headerMatch = changelogStr.match(versionHeaderRegExp);
      if (headerMatch && headerMatch[1]) {
        [, simpleVersion] = headerMatch;
      }
    }
    let headerVersionIndex = changelogStr.indexOf(`### [${simpleVersion}]`);
    if (headerVersionIndex === -1) {
      headerVersionIndex = changelogStr.indexOf(`### ${simpleVersion}`);
      if (headerVersionIndex === -1) {
        throw new Error(
          `The version "${simpleVersion}" can't be retrieved from the CHANGELOG located in ${changelogPath}`,
        );
      }
    }
    const changelogFromVersion = changelogStr.substr(headerVersionIndex);
    const [, nextVersionHeader] = changelogFromVersion.match(/### ?\[?(\d+.\d+.\d+)\]?/g);
    core.setOutput(
      'version-changelog',
      nextVersionHeader
        ? changelogFromVersion.substring(0, changelogFromVersion.indexOf(nextVersionHeader))
        : changelogFromVersion,
    );
  } catch (error) {
    core.setFailed(error.message);
  }
}

main().catch((error) => core.setFailed(error.message));
