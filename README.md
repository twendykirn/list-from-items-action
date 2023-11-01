# GitHub Action to create a list from an Array or an Object of Strings

As simple as it sounds.

## Inputs

| Key           | Description                     | Type                             | Required | Example                                                                                       |
| ------------- | ------------------------------- | -------------------------------- | -------- | --------------------------------------------------------------------------------------------- |
| `stringItems` | Your Array or Object of Strings | `String[]`/`Record<any, string>` | **Yes**  | `['file1.js', 'file2.js', 'file3.js']`/`{length:3,_0:'file1.js',_1:'file2.js',_2:'file3.js'}` |
| `listString`  | Your String for each list item  | `String`                         | **No**   | `Item: ${ITEM}\n`                                                                             |

## Outputs

| Key          | Description      | Type     | Example                                                   |
| ------------ | ---------------- | -------- | --------------------------------------------------------- |
| `stringList` | Your String List | `String` | `Item: file1.js` <br>`Item: file2.js`<br>`Item: file3.js` |

### Usage

Create a `.yml` file and place it inside your `.github/workflows` folder in the root of your project.

```
.github
└── workflows
   └── example.yml
```

Place this piece of code inside your `.yml` file.

```
- name: Create list from string items
  uses: twendykirn/list-from-items-action@v1.0.0
  with:
    stringItems: '["file1.js","file2.js","file3.js"]'
    listString: 'Item: ${ITEM}\n'
```

### Example:

This example prints a list of modified files in a commit.

```yaml
name: Print Modified Files

on:
    push:
        branches:
            - test

jobs:
    deploy:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v2
            - name: Get modified files
              id: modified_files
              uses: trilom/file-changes-action@v1.0.0
              with:
                  githubToken: ${{ secrets.GITHUB_TOKEN }}
            - name: Create list of modified files
              id: modified_files_list
              uses: twendykirn/list-from-items-action@v1.0.0
              with:
                  stringItems: ${{ steps.modified_files.outputs.files_modified }}
                  listString: 'Modified File: ${ITEM}\n'
            - name: Print modified files
              run: echo '${{ steps.modified_files_list.outputs.stringList }}'
```

## License

This project is distributed under the [MIT license](LICENSE.md).
