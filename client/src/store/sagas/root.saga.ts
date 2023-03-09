import { all } from 'redux-saga/effects';

import AuthSaga from './auth.saga';
import CommonSaga from './common.saga';
import WorkerSaga from './worker.saga';
import CompanySiteSaga from './company-site.saga';
import JobSaga from './job.saga';
import MsgSaga from './msg.saga';
import CategorySaga from './category.saga';
import paymentSaga from './payment.saga';
import DocumentSaga from './document.saga';
import ProductSaga from './product.saga';
import farmSaga from './farm.saga';

export default function* rootSaga() {
  yield all([
    AuthSaga(),
    CommonSaga(),
    WorkerSaga(),
    CompanySiteSaga(),
    JobSaga(),
    MsgSaga(),
    CategorySaga(),
    paymentSaga(),
    DocumentSaga(),
    ProductSaga(),
    farmSaga()
  ]);
}
