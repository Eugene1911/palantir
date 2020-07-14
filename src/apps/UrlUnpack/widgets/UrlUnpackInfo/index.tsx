import React from 'react';
import { inject, observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import { TCommonFetchingDataValueType } from 'sharedTypes';
import { IUrlUnpackFormStore } from '../UrlUnpackForm/stores/urlUnpackFormStore';

type TUrlUnpackInfoProps = {
  store?: IUrlUnpackFormStore;
};

function UrlUnpackInfo({ store }: TUrlUnpackInfoProps): JSX.Element {
  const { t } = useTranslation();
  const { urlInfoList, toggleCollapse, setToggleCollapse } = store;

  if (!urlInfoList.length) {
    return <Typography align="center">No results</Typography>;
  }

  return (
    <>
      <Collapse in={toggleCollapse} collapsedHeight={140}>
        <Table size="small">
          <TableBody>
            {urlInfoList.map((info: TCommonFetchingDataValueType) => (
              <TableRow key={info.name}>
                <TableCell>{info.name}</TableCell>
                <TableCell style={{ wordBreak: 'break-word' }}>
                  {info.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Collapse>
      <br />
      {!toggleCollapse && (
        <Button
          size="small"
          fullWidth
          onClick={(): void => setToggleCollapse(true)}
        >
          {t('url_unpack:form.show_more')}
        </Button>
      )}
    </>
  );
}

export default inject(({ urlUnpackFormStore }) => ({
  store: urlUnpackFormStore,
}))(observer(UrlUnpackInfo));
