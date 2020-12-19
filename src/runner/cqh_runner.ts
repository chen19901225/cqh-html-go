import * as vscode from "vscode"
import * as static_var from "../static_var"
import * as path from "path"
import * as fs from "fs"
import { IConfig, getSnippetForExt, getMatchText } from "../config";



export class CqhRunner {
    public constructor(public document: vscode.TextDocument,
        public range: vscode.Range) {

    }


    simpleReplace(name: string): string {
        let final = name;
        let workspaceRoot = "";
        if (vscode.workspace.workspaceFolders) {
            workspaceRoot = vscode.workspace.workspaceFolders[0].uri.fsPath;
        }
        let uri = path.dirname(this.document.uri.fsPath);
        final = final.replace(/__proj_dir__/g, workspaceRoot);  // 跟路劲
        final = final.replace(/__proj__/g, workspaceRoot);
        final = final.replace(/__dir__/g, uri);
        return final;
    }

    textReplace(name: string): string {
        let final = name;
        let workspaceRoot = "";
        if (vscode.workspace.workspaceFolders) {
            workspaceRoot = vscode.workspace.workspaceFolders[0].uri.fsPath;
        }
        let uri = path.dirname(this.document.uri.fsPath);
        final = final.replace(/__file__/g, this.document.uri.fsPath); // 当前路径
        final = final.replace(/__proj_dir__/g, workspaceRoot);  // 跟路劲
        final = final.replace(/__proj__/g, workspaceRoot);
        final = final.replace(/__dir__/g, uri);
        final = final.trim();
        return final;
    }

    async run() {
        let selectedText: string = this.document.getText(this.range).trim();
        let ext = path.extname(this.document.uri.fsPath);
        let snippet = getSnippetForExt(ext);
        if (snippet === null) {
            vscode.window.showErrorMessage("没有找到 ext " + ext);
            return;
        }
        let [flag, match_text] = getMatchText(snippet, selectedText);
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