/********************************************************************************
 * Copyright (C) 2017 TypeFox and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0
 ********************************************************************************/

import { LanguageGrammarDefinitionContribution, TextmateRegistry } from "@theia/monaco/lib/browser/textmate";
import { injectable } from "inversify";
import { DOCKER_LANGUAGE_ID } from "../common";

@injectable()
export class DockerGrammarContribution implements LanguageGrammarDefinitionContribution {

    readonly scopeName = 'source.dockerfile';

    registerTextmateLanguage(registry: TextmateRegistry) {
        monaco.languages.register({
            id: DOCKER_LANGUAGE_ID,
            filenamePatterns: [
                "*.dockerfile",
                "Dockerfile"
            ],
            extensions: ['.dockerfile'],
            filenames: ['Dockerfile'],
            aliases: ['Dockerfile']
        });
        monaco.languages.setLanguageConfiguration(DOCKER_LANGUAGE_ID, {
            comments: {
                lineComment: '#'
            },
            brackets: [
                ['{', '}'],
                ['[', ']'],
                ['(', ')']
            ],
            autoClosingPairs: [
                { open: '{', close: '}' },
                { open: '[', close: ']' },
                { open: '(', close: ')' },
                { open: '"', close: '"' },
                { open: '\'', close: '\'' }
            ],
            surroundingPairs: [
                { open: '{', close: '}' },
                { open: '[', close: ']' },
                { open: '(', close: ')' },
                { open: '"', close: '"' },
                { open: '\'', close: '\'' }
            ]
        });
        const grammar = require('../../data/docker.tmLanguage.json');
        registry.registerTextmateGrammarScope(this.scopeName, {
            async getGrammarDefinition() {
                return {
                    format: 'json',
                    content: grammar
                };
            }
        });
        registry.mapLanguageIdToTextmateGrammar(DOCKER_LANGUAGE_ID, this.scopeName);
    }
}