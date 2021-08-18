export default function asyncMiddleware(handler: any): any {
  return async (req: any, res: any, next: any) => {
    try {
      await handler(req, res);
    } catch (err) {
      next(err);
    }
  };
};
