// @flow
import React, { useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import { PageHeader, Alert, Button, message } from 'antd';
import { Link } from 'react-router-dom';

import CategoriesTable from '../../components/CategoriesTable';
import useMailTemplatesServiceReducer from '../../../mailTemplatesService/reducer';
import useMailTemplatesServiceSagas from '../../../mailTemplatesService/saga';
import {
  categoriesDataSelector,
  categoriesLoadingSelector,
  categoriesErrorSelector,
} from '../../../mailTemplatesService/selectors';
import { readMailTplCategoriesAction, delMailTplCategoriesAction } from '../../../mailTemplatesService/actions';

export default function CategoriesPage() {
  const dispatch = useDispatch();
  useMailTemplatesServiceReducer();
  useMailTemplatesServiceSagas();
  useEffect(() => {
    dispatch(readMailTplCategoriesAction());
  }, []);

  const categoriesData = useSelector(categoriesDataSelector);
  const categoriesLoading = useSelector(categoriesLoadingSelector);
  const categoriesError = useSelector(categoriesErrorSelector);

  const handleCategoryDelete = useCallback(id => {
    dispatch(delMailTplCategoriesAction(id));
    message.warning('Cetegory deleted');
  }, []);

  return (
    <article>
      <Helmet>
        <title>Categories Page</title>
      </Helmet>
      <PageHeader
        title={`Categories${categoriesData ? `(${categoriesData.size})` : ''}`}
        subTitle='Mail templates categories'
        extra={[
          <Button key='new' type='primary'>
            <Link to='/categories/new'>Add new category</Link>
          </Button>,
        ]}
      />
      {categoriesError ? (
        <Alert type='error' message='Something went wrong.' />
      ) : (
        <CategoriesTable items={categoriesData} loading={categoriesLoading} onCategoryDelete={handleCategoryDelete} />
      )}
    </article>
  );
}
