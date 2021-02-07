import path = require("path");
import * as vscode from "vscode"
import { getMatchText, getSnippetForExt, IConfig } from "../config";

// import * as static_var from "../static_var"

import { CqhRunner } from "../runner/cqh_runner";


export async function cqh_goto_list(textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, runner: CqhRunner) {
    let document = textEditor.document;

    let blocks: Array<[string, vscode.Range]> = [];
    const lines: string[] = document.getText().split(/\r?\n/g);
    const requestRanges: [number, number, string][] = []
    let i = 0;
    let ext = path.extname(document.uri.fsPath);
    let snippet = getSnippetForExt(ext);

    let error_message = ""
    if (snippet == null) {
        error_message = `snippet 为空 [${ext}]`
        vscode.window.showErrorMessage(error_message);
        throw new Error(error_message);
    }



    for (let line_index = 0; line_index < lines.length; line_index++) {
        let currentLine = lines[line_index];
        let [flag, title] = getMatchText(snippet, currentLine)
        if (flag) {
            requestRanges.push([line_index, line_index + 1, title]);
        }

    }

    for (let [blockStart, blockEnd, blockTitle] of requestRanges) {
        const range = new vscode.Range(blockStart, 0, blockEnd, 0);
        // const cmd: Command = {
        //     arguments: [document, range],
        //     title: 'CqhGoto Goto',
        //     command: consts.cmd_goto
        // };
        blocks.push([blockTitle, range]);
    }
    if (blocks.length == 0) {
        error_message = "列表为空"
        vscode.window.showErrorMessage(error_message);
        throw new Error(error_message)

    };

    let quickPickItem: vscode.QuickPickItem[] = [];
    let stringprefix = (value: string, count: number): string => {
        let prefix = "0".repeat(count);
        let tmp = prefix + value;
        return tmp.slice(tmp.length - count);
    }
    for (let i = 0; i < blocks.length; i++) {
        let prefix = stringprefix('' + i, 2);
        let [title, _] = blocks[i]
        quickPickItem.push({
            "label": `${prefix}.${title}`,
            "description": title

        })
    }

    let item = await vscode.window.showQuickPick(quickPickItem)

    if (!item) {
        return;
    }
    let { label, description } = item;
    for (let i = 0; i < blocks.length; i++) {
        let [title, range] = blocks[i];
        if (title == description) {
            // let runner = new CqhRunner(document, range);
            await runner.goto(document, range);
        }// if(title==description)
    }

}