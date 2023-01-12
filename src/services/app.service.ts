import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async test1(body) {
    const { a, b } = body;
    if (typeof a != 'string') {
      return 'error frist value not string';
    }
    if (typeof b != 'string') {
      return 'error second value not string';
    }

    if (/^\d+$/.test(a) == false || /^\d+$/.test(b) == false) {
      throw new HttpException(
        {
          meta: {
            code: HttpStatus.CONFLICT,
            message: 'error value ',
          },
        },
        HttpStatus.CONFLICT,
      );
      return 'error value ';
    }
    const result = (parseInt(a) + parseInt(b)).toString();
    console.log(result, typeof result);
    return { result: result, type_result: typeof result };
  }
}
