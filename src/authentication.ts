import * as express from "express";
import * as jwt from "jsonwebtoken";
import {JsonWebTokenError, JwtPayload, VerifyCallback, VerifyErrors} from "jsonwebtoken";
import {ValidateError} from "@tsoa/runtime";

export enum AuthSecurity {
    Key = 'api_key',
    Jwt = 'jwt',
}

export enum AuthScope {
    User = 'user',
    Admin = 'admin',
    Demo = 'demo',
}

export function expressAuthentication(
    request: express.Request,
    securityName: string,
    scopes?: string[]
): Promise<any> {
    if (securityName === AuthSecurity.Key) {
        let token;
        if (request.query && request.query.access_token) {
            token = request.query.access_token;
        }

        if (token === "abc123456") {
            return Promise.resolve({
                id: 1,
                name: "Ironman",
            });
        } else {
            return Promise.reject({});
        }
    }

    if (securityName === "jwt") {
        const token = (request.get("Authorization") as string || '')
            .replace(/^Bearer/, '')
            .trim();

        return new Promise((resolve, reject) => {
            if (!token) {
                reject(new JsonWebTokenError("No token provided"));
            }
            jwt.verify(token, "[secret]", ((err: VerifyErrors, decoded: JwtPayload) => {
                if (err) {
                    reject(err);
                } else {
                    // Check if JWT contains all required scopes
                    for (let scope of (scopes || [])) {
                        if (!(decoded.scopes || []).includes(scope)) {
                            reject(new JsonWebTokenError("JWT does not contain required scope."));
                        }
                    }
                    resolve(decoded);
                }
            }) as VerifyCallback<JwtPayload | string>);
        });
    }

    return Promise.reject({});
}
