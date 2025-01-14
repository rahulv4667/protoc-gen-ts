import * as pb_1 from "google-protobuf";
import * as grpc_1 from "@grpc/grpc-js";
export class Request extends pb_1.Message {
    constructor(data?: any[] | {
        a?: number;
        b?: number;
    }) {
        super();
        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
        if (!Array.isArray(data) && typeof data == "object") {
            if ("a" in data) {
                this.a = data.a;
            }
            if ("b" in data) {
                this.b = data.b;
            }
        }
    }
    get a() {
        return pb_1.Message.getField(this, 1) as number;
    }
    set a(value: number) {
        pb_1.Message.setField(this, 1, value);
    }
    get b() {
        return pb_1.Message.getField(this, 2) as number;
    }
    set b(value: number) {
        pb_1.Message.setField(this, 2, value);
    }
    toObject() {
        var data: {
            a?: number;
            b?: number;
        } = {};
        if (this.a != null) {
            data.a = this.a;
        }
        if (this.b != null) {
            data.b = this.b;
        }
        return data;
    }
    serialize(w?: pb_1.BinaryWriter): Uint8Array | undefined {
        const writer = w || new pb_1.BinaryWriter();
        if (this.a !== undefined)
            writer.writeInt32(1, this.a);
        if (this.b !== undefined)
            writer.writeInt32(2, this.b);
        if (!w)
            return writer.getResultBuffer();
    }
    static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Request {
        const reader = bytes instanceof Uint8Array ? new pb_1.BinaryReader(bytes) : bytes, message = new Request();
        while (reader.nextField()) {
            if (reader.isEndGroup())
                break;
            switch (reader.getFieldNumber()) {
                case 1:
                    message.a = reader.readInt32();
                    break;
                case 2:
                    message.b = reader.readInt32();
                    break;
                default: reader.skipField();
            }
        }
        return message;
    }
    serializeBinary(): Uint8Array {
        return this.serialize();
    }
    static deserializeBinary(bytes: Uint8Array): Request {
        return Request.deserialize(bytes);
    }
}
export class Response extends pb_1.Message {
    constructor(data?: any[] | {
        result?: number;
    }) {
        super();
        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
        if (!Array.isArray(data) && typeof data == "object") {
            if ("result" in data) {
                this.result = data.result;
            }
        }
    }
    get result() {
        return pb_1.Message.getField(this, 1) as number;
    }
    set result(value: number) {
        pb_1.Message.setField(this, 1, value);
    }
    toObject() {
        var data: {
            result?: number;
        } = {};
        if (this.result != null) {
            data.result = this.result;
        }
        return data;
    }
    serialize(w?: pb_1.BinaryWriter): Uint8Array | undefined {
        const writer = w || new pb_1.BinaryWriter();
        if (this.result !== undefined)
            writer.writeInt32(1, this.result);
        if (!w)
            return writer.getResultBuffer();
    }
    static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Response {
        const reader = bytes instanceof Uint8Array ? new pb_1.BinaryReader(bytes) : bytes, message = new Response();
        while (reader.nextField()) {
            if (reader.isEndGroup())
                break;
            switch (reader.getFieldNumber()) {
                case 1:
                    message.result = reader.readInt32();
                    break;
                default: reader.skipField();
            }
        }
        return message;
    }
    serializeBinary(): Uint8Array {
        return this.serialize();
    }
    static deserializeBinary(bytes: Uint8Array): Response {
        return Response.deserialize(bytes);
    }
}
export interface IExampleService extends grpc_1.ServiceDefinition<grpc_1.UntypedServiceImplementation> {
    add: grpc_1.MethodDefinition<Request, Response>;
}
export interface IExampleServer extends grpc_1.UntypedServiceImplementation {
    add: grpc_1.handleUnaryCall<Request, Response>;
}
export const Example = {
    add: {
        path: "/Example/add",
        requestStream: false,
        responseStream: false,
        requestSerialize: (message: Request) => Buffer.from(message.serialize()),
        requestDeserialize: (bytes: Buffer) => Request.deserialize(new Uint8Array(bytes)),
        responseSerialize: (message: Response) => Buffer.from(message.serialize()),
        responseDeserialize: (bytes: Buffer) => Response.deserialize(new Uint8Array(bytes))
    }
};
export class ExampleClient extends grpc_1.makeGenericClientConstructor(Example, "Example", {}) {
    constructor(address: string, credentials: grpc_1.ChannelCredentials, options?: Partial<grpc_1.ChannelOptions>) {
        super(address, credentials, options)
    }
}
