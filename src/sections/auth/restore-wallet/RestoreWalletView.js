import { RHFTextField } from '@components/hook-form';
import FormProvider from '@components/hook-form/FormProvider';
import { DEFAULT_PASSCODE } from '@config';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Alert, Button, Divider, Stack, Typography } from '@mui/material';
import { PATH_AUTH } from '@routes/paths';
import { saveWalletInfo } from '@utils/sessionManager';
import Web3Utils from '@utils/web3Utils';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useAppContext } from 'src/auth/useAppContext';
import * as Yup from 'yup';

const RestoreWallet = () => {
  const router = useRouter();
  const { loadWallet } = useAppContext();

  const RegisterSchema = Yup.object().shape({
    mnemonics: Yup.string().required('Mnemonics required').required('Mnemonics required'),
  });

  const defaultValues = {
    mnemonics: '',
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
      const wallet = Web3Utils.getWalletUsingMnemonic(data?.mnemonics?.trim());
      saveWalletInfo(
        await wallet.encrypt(DEFAULT_PASSCODE, {
          scrypt: {
            N: 2,
          },
        })
      );
      await loadWallet(wallet);
      router.reload();
      // router.push(PATH_AUTH.linkAgency);
    } catch (error) {
      if (error?.message == 'invalid mnemonic')
        setError('afterSubmit', {
          message: 'Please enter valid 12 word mnemonics',
        });
      else
        setError('afterSubmit', {
          message: 'Something went wrong please try again later!',
        });
    }
  };

  return (
    <Stack spacing={6} height="75vh" sx={{ position: 'relative', zIndex: 9 }} direction="column">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" spacing={2} mt={4}>
          <Typography variant="h5">Please enter 12 word mnemonics</Typography>
          {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
          <RHFTextField
            name="mnemonics"
            label="Mnemonics"
            multiline
            rows={3}
            placeholder="Eg:-  success victory type market tiger mobile happy empty random physical two leaf"
          />
          <Divider />
          <LoadingButton type="submit" variant="contained" loading={isSubmitting} disabled={isSubmitting}>
            Continue
          </LoadingButton>
          <Button variant="outlined" onClick={() => router.push(PATH_AUTH.root)}>
            Cancel
          </Button>
        </Stack>
      </FormProvider>
    </Stack>
  );
};

export default RestoreWallet;
