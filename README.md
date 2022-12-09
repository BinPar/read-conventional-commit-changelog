<!-- start title -->

# GitHub Action: Read conventional commit CHANGELOG

<!-- end title -->
<!-- start description -->

Reads the conventional commit generated CHANGELOG and outputs the requested version changes.

<!-- end description -->

| **package version** | **github runner version** |
| :------------------ | :------------------------ |
| < v2.0.0            | < 2.297.0                 |
| >= v2.0.0           | >= 2.297.0                |

<!-- start contents -->
<!-- end contents -->
<!-- start usage -->

```yaml
- uses: BinPar/read-conventional-commit-changelog@v2.0.0
  with:
    # The CHANGELOG path. Defaults to ./CHANGELOG.md
    # Default: ./CHANGELOG.md
    changelog-path: ""

    # The version of the changelog to output. Defaults to latest
    # Default: latest
    version: ""

    # If false the action will not fail and instead returns empty string if an error
    # is raised. Defaults to true
    # Default: true
    fail: ""
```

<!-- end usage -->
<!-- start inputs -->

| **Input**            | **Description**                                                                                            |   **Default**    | **Required** |
| :------------------- | :--------------------------------------------------------------------------------------------------------- | :--------------: | :----------: |
| **`changelog-path`** | The CHANGELOG path. Defaults to ./CHANGELOG.md                                                             | `./CHANGELOG.md` |  **false**   |
| **`version`**        | The version of the changelog to output. Defaults to latest                                                 |     `latest`     |  **false**   |
| **`fail`**           | If false the action will not fail and instead returns empty string if an error is raised. Defaults to true |      `true`      |  **false**   |

<!-- end inputs -->
<!-- start outputs -->

| **Output**          | **Description**               | **Default** | **Required** |
| :------------------ | :---------------------------- | ----------- | ------------ |
| `version-changelog` | The requested version changes |             |              |

<!-- end outputs -->
<!-- start [.github/ghdocs/examples/] -->
<!-- end [.github/ghdocs/examples/] -->
