<!-- start title -->

# GitHub Action: Read conventional commit CHANGELOG

<!-- end title -->
<!-- start description -->

Reads the conventional commit generated CHANGELOG and outputs the requested version changes

<!-- end description -->
<!-- start contents -->
<!-- end contents -->
<!-- start usage -->

```yaml
- uses: BinPar/read-conventional-commit-changelog@v1.0.1
  with:
    # The CHANGELOG path. Defaults to ./CHANGELOG.md
    # Default: ./CHANGELOG.md
    changelog-path: ""

    # The version of the changelog to output. Defaults to latest
    # Default: latest
    version: ""
```

<!-- end usage -->
<!-- start inputs -->

| **Input**            | **Description**                                            |   **Default**    | **Required** |
| :------------------- | :--------------------------------------------------------- | :--------------: | :----------: |
| **`changelog-path`** | The CHANGELOG path. Defaults to ./CHANGELOG.md             | `./CHANGELOG.md` |  **false**   |
| **`version`**        | The version of the changelog to output. Defaults to latest |     `latest`     |  **false**   |

<!-- end inputs -->
<!-- start outputs -->

| **Output**          | **Description**               | **Default** | **Required** |
| :------------------ | :---------------------------- | ----------- | ------------ |
| `version-changelog` | The requested version changes |             |              |

<!-- end outputs -->
<!-- start [.github/ghdocs/examples/] -->
<!-- end [.github/ghdocs/examples/] -->
