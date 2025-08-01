import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { usersAPI } from '../../Features/users/userAPI';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'sonner';

type VerifyInputs = {
    email: string;
    code: string;
};

const schema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    code: yup
        .string()
        .matches(/^\d{6}$/, 'Code must be a 6 digit number')
        .required('Verification code is required'),
});

const VerifyUser = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const emailFromState = location.state?.email || '';

    const [verifyUser, { isLoading }] = usersAPI.useVerifyUserMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<VerifyInputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            email: emailFromState,
        },
    });

    const onSubmit: SubmitHandler<VerifyInputs> = async (data) => {
        try {
            await verifyUser({
                email: data.email,
                verificationCode: data.code,
            }).unwrap();

            toast.success("Account verified successfully!");
            setTimeout(() => {
                navigate('/login', { state: { email: data.email } });
            }, 2000);
        } catch (error) {
            console.error("Verification error:", error);
            toast.error("Verification failed. Please check your code and try again");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-base-200">
            {/* Light blue form background */}
            <div className="w-full max-w-md p-8 rounded-xl shadow-lg bg-blue-100">
                <h1 className="text-2xl font-bold mb-6 text-center">Verify Your Account</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    
                    <input
                        type="email"
                        {...register('email')}
                        placeholder="Email"
                        className="bg-white border border-gray-300 rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg"
                        readOnly={!!emailFromState}
                    />
                    {errors.email && (
                        <span className="text-red-700 text-sm">{errors.email.message}</span>
                    )}

                    <input
                        type="text"
                        {...register('code')}
                        placeholder="6 Digit Code"
                        maxLength={6}
                        className="bg-white border border-gray-300 rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg"
                    />
                    {errors.code && (
                        <span className="text-red-700 text-sm">{errors.code.message}</span>
                    )}

                    {/* Dark blue submit button */}
                    <button
                        type="submit"
                        className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded w-full mt-4"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="loading loading-spinner text-primary" /> Verifying...
                            </>
                        ) : (
                            'Verify'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VerifyUser;
