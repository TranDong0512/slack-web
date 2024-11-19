/** @format */

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Separator } from '@/components/ui/separator';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { passwordSchema } from '@/lib/utils';
import { SignInFlowCardProps } from '../interface';

const formSchema = z
  .object({
    email: z
      .string()
      .min(2, 'Email must have at least 2 characters')
      .max(70, 'Email must not exceed 70 characters')
      .email('Invalid email'),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const SignUpCard = ({ onStateChange }: SignInFlowCardProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="">Login to continue</CardTitle>
      </CardHeader>
      <CardDescription>
        Use your email or another service to continue
      </CardDescription>
      <CardContent className="space-y-5 px-0 pb-0 pt-2">
        <form className="space-y-2.5" onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register('email')}
            type="email"
            name="email"
            placeholder="Email"
            disabled={false}
          ></Input>
          {errors.email && (
            <p className="text-sm text-red-500 flex justify-end">
              {errors.email.message}
            </p>
          )}
          <Input
            {...register('password')}
            type="password"
            name="password"
            placeholder="Password"
            disabled={false}
          ></Input>
          {errors.password && (
            <p className="text-sm text-red-500  flex justify-end">
              {errors.password.message}
            </p>
          )}
          <Input
            {...register('confirmPassword')}
            type="password"
            name="confirmPassword"
            placeholder="ConfirmPassword"
            disabled={false}
          ></Input>
          {errors?.confirmPassword && (
            <p className="text-sm text-red-500  flex justify-end">
              {errors?.confirmPassword.message}
            </p>
          )}
          <Button type="submit" className="w-full" size={'lg'}>
            Continue
          </Button>
        </form>

        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            type="submit"
            disabled={false}
            onClick={() => {}}
            variant={'outline'}
            className="w-full relative"
            size={'lg'}
          >
            <FcGoogle className="size-5 absolute top-3 left-2.5" />
            Continue with Google
          </Button>
          <Button
            disabled={false}
            onClick={() => {}}
            variant={'outline'}
            className="w-full relative"
            size={'lg'}
          >
            <FaGithub className="size-5 absolute top-3 left-2.5" />
            Continue with GitHub
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          Already have a account?{' '}
          <span
            className="text-sky-700 cursor-pointer hover:underline"
            onClick={() => onStateChange('signIn')}
          >
            Sign in{' '}
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
