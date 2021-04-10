const fs = require("fs");

const [, , source, dtsAndJs, dest] = process.argv;

const sourceDir = `./bazel-bin/${source}`;
const destDir = `./${dest || source}`;
const objects = fs.readdirSync(sourceDir);

let check = (object) => object.endsWith(".ts") && !object.endsWith(".spec.ts") && !object.endsWith(".d.ts");

if ( dtsAndJs ) {
    check = (object) => object.endsWith(".js") || object.endsWith(".d.ts");
}

for (const object of objects) {
    if (check(object)) {
        const sourcePath = `${sourceDir}/${object}`;
        const targetPath = `${destDir}/${object}`;
        if (fs.statSync(sourcePath).isFile()) {
            if (fs.existsSync(targetPath)) {
                fs.unlinkSync(targetPath);
            }
            fs.copyFileSync(sourcePath, targetPath);
        }
    }
}