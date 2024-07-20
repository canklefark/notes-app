import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function directoryTree(dirPath) {
	const name = path.basename(dirPath);

	// Exclude node_modules and .git directories
	if (name === 'node_modules' || name === '.git') {
		return null;
	}

	const item = { name };
	try {
		const stats = await fs.stat(dirPath);

		if (stats.isFile()) {
			return item;
		} else if (stats.isDirectory()) {
			item.type = 'directory';
			const children = await fs.readdir(dirPath);
			item.children = await Promise.all(
				children.map((child) => directoryTree(path.join(dirPath, child)))
			);
			item.children = item.children.filter((e) => !!e);
			return item;
		}
	} catch (error) {
		console.error(`Error processing ${dirPath}:`, error);
		return null;
	}
}

async function main() {
	try {
		const projectStructure = await directoryTree(path.resolve(__dirname, '.'));
		await fs.writeFile('project-structure.json', JSON.stringify(projectStructure, null, 2));
		console.log('Project structure exported to project-structure.json');
	} catch (error) {
		console.error('Error exporting project structure:', error);
	}
}

main();
