import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {NoteSpaceModule} from "@src/note-space/note-space.module";
import {UsersModule} from "@src/users/users.module";

describe('NoteSpaceController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                NoteSpaceModule,
                UsersModule
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    // Test wrong route
    it('/note-space/ (GET)', () => {
        return request(app.getHttpServer())
            .get('/note-space/')
            .expect(404);
    });

    /**
     * Test create successfully
     */
    it('/note-space/create (POST)', () => {
        return request(app.getHttpServer())
            .post('/note-space/')
            .send({
                name: "Testing Note",
                hasPassword: false,
                visitorCanView: true,
                visitorCanEdit: true,
                email: "sethphat@gmail.com"
            })
            .set('Accept', 'application/json')
            .expect(200)
    });

    afterAll(async () => {
        await app.close()
    })
});
