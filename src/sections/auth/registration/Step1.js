import { RHFTextField } from '@components/hook-form';
import FormProvider from '@components/hook-form/FormProvider';
import { useAuthContext } from '@contexts/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Alert, Box, Divider, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import MnemonicDialog from './MnemonicDialog';

const Step1 = () => {
  const { handleRegisterForm } = useAuthContext();

  const [mnemonic, setMnemonic] = useState(null);

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Full name required').required('Full name required'),
    phone: Yup.string().required('Phone number required'),
    // .test('unique-phone', 'Phone number already in use', async (value) => {
    //   try {
    //     const response = await VendorService.checkIfPhoneNoExists(value);
    //     return !response.data.data;
    //   } catch (err) {
    //     console.error(err);
    //     return false;
    //   }
    // }),
  });
  const defaultValues = {
    name: '',
    phone: '',
    address: {
      city: 'ktm',
    },
  };

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(RegisterSchema),
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      console.log('ON SUBMIT CALLED');
      const res = await handleRegisterForm(data);
      if (res.address) {
        const mnemonic = res._mnemonic();
        setMnemonic(mnemonic);
      }
    } catch (error) {
      console.error(error);

      reset();

      setError('afterSubmit', {
        ...error,
        message: error.message,
      });
    }
  };

  return (
    <Box>
      <MnemonicDialog onClose={() => setMnemonic(null)} mnemonic={mnemonic} open={mnemonic} />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2.5}>
          {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
          <RHFTextField name="name" label="Full Name" />
          <RHFTextField name="phone" label="Phone" />

          <Divider />

          <LoadingButton type="submit" variant="contained" loading={isSubmitting} disabled={isSubmitting}>
            Continue
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Box>
  );
};

Step1.propTypes = {
  handleFormSubmit: PropTypes.func,
};

export default Step1;
