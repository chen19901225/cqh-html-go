'use strict';
import * as vscode from "vscode";
import { CancellationToken, CodeLens, CodeLensProvider, Command, Range, TextDocument, workspace } from 'vscode';
//import * as Constants from '../common/constants';
//import { Selector } from '../utils/selector';
import * as static_var from "../static_var";
import { IConfig, getSnippetForExt, getMatchText } from '../config';
import * as path from "path";
import * as utils from "../utils"

export class CqhCodeLenProvider implements CodeLensProvider {
    public provideCodeLenses(document: TextDocument, token: CancellationToken): Promise<CodeLens[]> {
        const blocks: CodeLens[] = [];
        const lines: string[] = document.getText().split(/\r?\n/g);
        const requestRanges: [number, number][] = []
        let i = 0;
        // let snippet = utils.getWorkSpaceRoot
        let ext = path.extname(document.uri.fsPath);
        let snippet = getSnippetForExt(ext);
        if (snippet == null) {
            return Promise.resolve(blocks);
        }



        for (let line_index = 0; line_index < lines.length; line_index++) {
            let currentLine = lines[line_index];
            currentLine = currentLine.trim();
            // let start_text = Constants.startText;
            // if (currentLine.startsWith(snippet.list[0] + start_text)) {
            //     if (snippet.list[1] && !currentLine.endsWith(snippet.list[1])) {
            //         continue;
            //     }

            // }
            let [flag, match_text] = getMatchText(snippet, currentLine);
            if (flag) {
                requestRanges.push([line_index, line_index + 1]);
            }


        }

        for (let [blockStart, blockEnd] of requestRanges) {
            const range = new Range(blockStart, 0, blockEnd, 0);
            const cmd: Command = {
                arguments: [document, range],
                title: 'cqh-html-go go',
                command: static_var.cmd_goto
            };
            blocks.push(new CodeLens(range, cmd));
        }

        return Promise.resolve(blocks);
    }
}