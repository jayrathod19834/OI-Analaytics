import React from 'react';
import { Row } from 'reactstrap';
// import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import AddUser from '../addUser';

const Add = ({ match }) => (
  <>
    <Row>
      <Colxx xxs="12">
        <Breadcrumb heading="Add User" match={match} />
        <Separator className="mb-5" />
      </Colxx>
    </Row>
    <Row>
      <Colxx xxs="12" className="mb-4">
        <p>
          Add User
        </p>
        <AddUser />
      </Colxx>
    </Row>
  </>
);
export default Add;
