import * as vscode from "vscode";
export function getWorkSpaceRoot(): string | null {
    let workspaceRoot = null;
    if (vscode.workspace.workspaceFolders) {
        workspaceRoot = vscode.workspace.workspaceFolders[0].uri.fsPath;
    }
    return workspaceRoot;
}