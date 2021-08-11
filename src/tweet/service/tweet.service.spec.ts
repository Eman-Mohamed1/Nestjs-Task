import { Test, TestingModule } from '@nestjs/testing';
import { tweetService } from './tweet.service';

describe('tweetService', () => {
  let service: tweetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [tweetService],
    }).compile();

    service = module.get<tweetService>(tweetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
