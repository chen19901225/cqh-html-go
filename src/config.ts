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
        if (!start_text.endsWith("(")) {
            start_text = start_text + "("
        }
        if (line_text.startsWith(start_text)) {
            let start_text_length = start_text.length;
            let next_ch = line_text[start_text_length]; // 判断下一个字符是不是引号
            let match_quote = ["'", '"']
            for (let quote of match_quote) {
                if (quote == next_ch) {
                    let end_index = line_text.lastIndexOf(quote)
                    if (end_index > -1 && end_index > start_text_length) { // 获取结束的引号的位置
                        
                        let match_text = line_text.slice(start_text_length + 1, end_index + 1)
                        return [true, match_text]
                    }
                }
            }
        }
    }

    return [false, ""]
}
export function getSnippetForExt(ext: string): ICommand | null {
    if (!ext.startsWith(".")) { // 不是ext二十路径
        ext = extname(ext);
    }
    let config = vscode.workspace.getConfiguration("cqh-goto") as IConfig;
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