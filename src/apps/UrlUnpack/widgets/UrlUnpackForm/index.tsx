import React from 'react';
import { inject, observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import ButtonWithLoading from 'sharedComponents/ButtonWithLoading';
import { IUrlUnpackFormStore } from './stores/urlUnpackFormStore';

type TUrlUnpackFormProps = {
  form?: IUrlUnpackFormStore;
};

function UrlUnpackForm({ form }: TUrlUnpackFormProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <form noValidate autoComplete="off">
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Box p={0} mb={2}>
            <FormControl fullWidth>
              <TextField
                multiline
                rows={3}
                label="URL"
                value={form.url}
                onChange={form.onChangeTextFieldHandler}
              />
            </FormControl>
          </Box>
        </Grid>
        <Grid container direction="row" justify="flex-end">
          <ButtonWithLoading
            isPending={form.isLoading}
            isDisabled={!form.url}
            onClick={form.onSubmitFormHandler}
            label={t('url_unpack:form.button')}
          />
        </Grid>
      </Grid>
    </form>
  );
}

export default inject(({ urlUnpackFormStore }) => ({
  form: urlUnpackFormStore,
}))(observer(UrlUnpackForm));
