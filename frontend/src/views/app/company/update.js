import React from 'react';
import { Row } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import GetCompany from './GetCompany';

const Update = ({ match }) => (
  <>
    <Row>
      <Colxx xxs="12">
        <Breadcrumb heading="List Company" match={match} />
        <Separator className="mb-5" />
      </Colxx>
    </Row>
    <Row>
      <Colxx xxs="12" className="mb-4">
        <p>
          <IntlMessages id="List Company" />
        </p>
        <GetCompany id = {match.params.id} />
      </Colxx>
    </Row>
  </>
);
export default Update;
