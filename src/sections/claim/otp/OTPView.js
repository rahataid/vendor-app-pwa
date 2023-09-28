import { RHFTextField } from '@components/hook-form';
import FormProvider from '@components/hook-form/FormProvider';
import { SPACING } from '@config';
import { yupResolver } from '@hookform/resolvers/yup';
import { useErrorHandler } from '@hooks/useErrorHandler';
import { LoadingButton } from '@mui/lab';
// import { useDashboardContext } from '@contexts/dashboard';
import { Box, Stack, Typography } from '@mui/material';
import { PATH_DASHBOARD } from '@routes/paths';
// import { PATH_AUTH } from '@routes/paths';
import { useProject } from '@services/contracts/useProject';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useAppContext } from 'src/auth/useAppContext';
import * as Yup from 'yup';

const OTPView = () => {
  const snackBar = useSnackbar();

  const { beneficiary } = useAppContext();
  const { processTokenRequest } = useProject();
  const { handleError } = useErrorHandler();

  const router = useRouter();

  const RegisterSchema = Yup.object().shape({
    otp: Yup.string().required('OTP required').required('OTP required'),
  });

  const defaultValues = {
    otp: '',
  };

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(RegisterSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onContinue = async (data) => {
    const { otp } = data;
    //await addOtpToClaim(claimId, otp);
    try {
      const tx = await processTokenRequest(beneficiary, otp);

      if (tx) {
        const receipt = await tx.wait();
        if (receipt.status) {
          snackBar.enqueueSnackbar('Token successfully transferred. ', { variant: 'success' });
          router.push(PATH_DASHBOARD.root);
        }
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <Box p={2}>
      <Stack>
        <Typography variant="h3">Enter OTP</Typography>
      </Stack>
      <FormProvider methods={methods} onSubmit={handleSubmit(onContinue)}>
        <Stack mt={SPACING.GRID_SPACING * 2}>
          <RHFTextField name="otp" label="Enter OTP code" />
        </Stack>
        <Stack mt={SPACING.GRID_SPACING * 2}>
          <LoadingButton type="submit" size="large" variant="contained" loading={isSubmitting} disabled={isSubmitting}>
            Continue
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Box>
  );
};

export default OTPView;
