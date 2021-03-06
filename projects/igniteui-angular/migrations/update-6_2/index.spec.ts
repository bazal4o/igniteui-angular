import * as path from 'path';

// tslint:disable:no-implicit-dependencies
import { virtualFs } from '@angular-devkit/core';
import { EmptyTree } from '@angular-devkit/schematics';
// tslint:disable-next-line:no-submodule-imports
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';

describe('Update 6.2.0', () => {
    let appTree: UnitTestTree;
    const schematicRunner = new SchematicTestRunner('ig-migrate', path.join(__dirname, '../migration-collection.json'));
    const configJson = {
        defaultProject: 'testProj',
        projects: {
            testProj: {
                sourceRoot: '/testSrc'
            }
        },
        schematics: {
            '@schematics/angular:component': {
                prefix: 'appPrefix'
            }
        }
      };

    beforeEach(() => {
        appTree = new UnitTestTree(new EmptyTree());
        appTree.create('/angular.json', JSON.stringify(configJson));
    });

    it('should update igxDatePicker selector', done => {
        appTree.create(
            '/testSrc/appPrefix/component/test.component.html',
            `<igx-datePicker></igx-datePicker>`
        );
        const tree = schematicRunner.runSchematic('migration-05', {}, appTree);
        expect(tree.readContent('/testSrc/appPrefix/component/test.component.html'))
            .toEqual(`<igx-date-picker></igx-date-picker>`);
        done();
    });
});
