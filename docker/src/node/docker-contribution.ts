/********************************************************************************
 * Copyright (C) 2017 TypeFox and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0
 ********************************************************************************/

import { injectable } from "inversify";
import { IConnection, BaseLanguageServerContribution } from "@theia/languages/lib/node";
import { DOCKER_LANGUAGE_ID, DOCKER_LANGUAGE_NAME } from '../common';

@injectable()
export class DockerContribution extends BaseLanguageServerContribution {

    readonly id = DOCKER_LANGUAGE_ID;
    readonly name = DOCKER_LANGUAGE_NAME;

    start(clientConnection: IConnection): void {
        const path =  require.resolve('dockerfile-language-server-nodejs/lib/server');
        const command = 'node';
        const args: string[] = [
            path,
            '--stdio'
        ];
        const serverConnection = this.createProcessStreamConnection(command, args);
        this.forward(clientConnection, serverConnection);
    }
}
