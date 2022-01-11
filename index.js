const core = require('@actions/core');
const fs = require('fs').promises;

async function main() {
  const shouldFailString =
    core.getInput('fail', {
      required: false,
      trimWhitespace: true,
    }) || 'true';
  const shouldFail = shouldFailString === 'true';
  core.debug(`Should fail the workflow: ${shouldFail}`);
  try {
    const changelogPath = core.getInput('changelog-path') || './CHANGELOG.md';
    core.debug(`CHANGELOG Path: ${changelogPath}`);
    const versionToRetrieve = core.getInput('version') || 'latest';
    core.debug(`Version: ${versionToRetrieve}`);
    let simpleVersion = versionToRetrieve.replace(/^v/, '');
    const changelogStr = await fs.readFile(changelogPath, {
      encoding: 'utf-8',
    });
    if (simpleVersion === 'latest') {
      const versionHeaderRegExp = /#{1,3} ?\[?(\d+.\d+.\d+)\]?/;
      const headerMatch = changelogStr.match(versionHeaderRegExp);
      if (headerMatch && headerMatch[1]) {
        [, simpleVersion] = headerMatch;
      }
    }
    let headerVersionIndex = changelogStr.indexOf(`# [${simpleVersion}]`);
    if (headerVersionIndex === -1) {
      headerVersionIndex = changelogStr.indexOf(`# ${simpleVersion}`);
      if (headerVersionIndex === -1) {
        throw new Error(
          `The version "${simpleVersion}" can't be retrieved from the CHANGELOG located in ${changelogPath}`,
        );
      }
    }
    const changelogFromVersion = changelogStr.substr(headerVersionIndex);
    const [, nextVersionHeader] = changelogFromVersion.match(
      /#{1,3} ?\[?(\d+.\d+.\d+)\]?/g,
    );
    core.setOutput(
      'version-changelog',
      nextVersionHeader
        ? changelogFromVersion.substring(
            0,
            changelogFromVersion.indexOf(nextVersionHeader),
          )
        : changelogFromVersion,
    );
  } catch (error) {
    if (shouldFail) {
      core.setFailed(error.message);
    } else {
      core.warning('The action failed but will not fail the workflow.');
      core.warning(error.message);
      core.setOutput('version-changelog', '');
    }
  }
}

main().catch((error) => core.setFailed(error.message));
