import * as vscode from "vscode"
import * as static_var from "../static_var"
import * as path from "path"
import * as fs from "fs"
import { IConfig, getSnippetForExt, getMatchText } from "../config";



export class CqhRunner {
    outputChannel: vscode.OutputChannel
    public constructor() {
            this.outputChannel = vscode.window.createOutputChannel("cqh-html-go");
    }


    // public getOrCreateOutputChannel() {
    //     if (!this.outputChannel) {
    //         this.outputChannel = vscode.window.createOutputChannel('cqh-html-go'); // 创建Channel
    //     }
    //     return this.outputChannel;
    // }

    async goto(document: vscode.TextDocument, range: vscode.Range) {
        let selectedText: string = document.getText(range).trim();
        let ext = path.extname(document.uri.fsPath);
        let snippet = getSnippetForExt(ext);
        if (snippet === null) {
            vscode.window.showErrorMessage("没有找到 ext " + ext);
            return;
        }
        let [flag, match_text] = getMatchText(snippet, selectedText);
        this.outputChannel.appendLine(`flag:${flag}, match_text:[${match_text}]`);
        if (!flag) {
            vscode.window.showErrorMessage(`行内容不匹配[${selectedText}]`)
            return
        }
        await vscode.commands.executeCommand("workbench.action.quickOpen", match_text);

        // for(let i=0;i<searchArray.length;i++){
        //     await vscode.commands.executeCommand("workbench.action.quickOpen", searchArray[i]);
        // }


    }
}