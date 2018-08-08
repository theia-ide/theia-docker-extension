/********************************************************************************
 * Copyright (C) 2017 TypeFox and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0
 ********************************************************************************/
import { DockerClientContribution } from './docker-contribution';
import { LanguageClientContribution } from "@theia/languages/lib/browser";
import { ContainerModule } from "inversify";
import { LanguageGrammarDefinitionContribution } from '@theia/monaco/lib/browser/textmate';
import { DockerGrammarContribution } from './docker-grammar-contribution';

export default new ContainerModule(bind => {
    
    bind(DockerClientContribution).toSelf().inSingletonScope();
    bind(LanguageClientContribution).toDynamicValue(ctx => ctx.container.get(DockerClientContribution));

    bind(LanguageGrammarDefinitionContribution).to(DockerGrammarContribution).inSingletonScope();
});