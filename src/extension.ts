// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as static_var from "./static_var"
import { CqhCodeLenProvider } from './providers/cqh_code_len_provider';
import { CqhRunner } from './runner/cqh_runner';
import { cqh_goto_list } from './handler/list';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "cqh-html-go" is now active!');

	// // The command has been defined in the package.json file
	// // Now provide the implementation of the command with registerCommand
	// // The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('cqh-html-go.helloWorld', () => {
	// 	// The code you place here will be executed every time your command is executed

	// 	// Display a message box to the user
	// 	vscode.window.showInformationMessage('Hello World from cqh_html_go!');
	// });

	// context.subscriptions.push(disposable);


	let docSelector = {
		language: '*',
		scheme: 'file',
	};

	let codeLensProviderDisposable = vscode.languages.registerCodeLensProvider(
		docSelector,
		new CqhCodeLenProvider()
	)

	context.subscriptions.push(codeLensProviderDisposable)
	let disposable = vscode.commands.registerCommand(static_var.cmd_goto, async (document: vscode.TextDocument,
		range: vscode.Range) => {
		let runner = new CqhRunner(document, range);
		await runner.run();

	})


	context.subscriptions.push(disposable);

	// 
	let listDisposable = vscode.commands.registerTextEditorCommand(static_var.cmd_list, async (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) => {
		await cqh_goto_list(textEditor, edit);
	})
	context.subscriptions.push(listDisposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
