import * as vscode from "vscode"
import { extname } from "path";

export interface ICommand {
    name: string
    // comment_list: [string, string];
    start_text_list: Array<string>
}

export interface IConfig extends vscode.WorkspaceConfiguration {
    byExt: ICommand[];
}

export function getMatchText(cmd: ICommand, text: string): [boolean, string] {
    let line_text = text.trim();
    for (let start_text of cmd.start_text_list) {
        // if (!start_text.endsWith("(")) {
        //     start_text = start_text + "("
        // }
        var re = new RegExp(start_text);
        var match = re.exec(line_text)
        if (match) {
            return [true, match[1]]
        }

    }

    return [false, ""]
}
export function getSnippetForExt(ext: string): ICommand | null {
    if (!ext.startsWith(".")) { // 不是ext二十路径
        ext = extname(ext);
    }
    let config = vscode.workspace.getConfiguration("cqh-html-go") as IConfig;
    let snippet = null;
    for (let i = 0; i < config.byExt.length; i++) {
        let current_snippet = config.byExt[i];
        if (current_snippet.name === ext) {
            snippet = current_snippet;
            break;
        }
    }

    return snippet;
    //return null;
}