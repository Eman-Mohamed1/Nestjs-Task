import { Test, TestingModule } from '@nestjs/testing';
import { tweetController } from './tweet.controller';

describe('tweetController', () => {
  let controller: tweetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [tweetController],
    }).compile();

    controller = module.get<tweetController>(tweetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
