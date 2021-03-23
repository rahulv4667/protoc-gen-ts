const fs = require("fs");

for (const object of fs.readdirSync("./src/compiler")) {
    if ( object == "BUILD.bazel" || object == "index.ts" ) {
       continue;
    }

    fs.unlinkSync(`./src/compiler/${object}`);
}

fs.copyFileSync("./third-party/protobuf/src/google/protobuf/descriptor.proto", "./src/compiler/descriptor.proto");

const descriptorPb = fs.readFileSync("./third-party/protobuf/src/google/protobuf/descriptor.proto")
    .toString()
    .replace(`package google.protobuf;`, "");

fs.writeFileSync("./src/compiler/descriptor.proto", descriptorPb);


const pluginPb = fs.readFileSync("./third-party/protobuf/src/google/protobuf/compiler/plugin.proto")
    .toString()
    .replace(`"google/protobuf/descriptor.proto"`, `"src/compiler/descriptor.proto"`)
    .replace(`package google.protobuf.compiler;`, "");

fs.writeFileSync("./src/compiler/plugin.proto", pluginPb);