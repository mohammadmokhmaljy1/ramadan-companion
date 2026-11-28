import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, UserRound, Mail, LockKeyhole } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { router } from '@/app/router';

import { registerSchema, type RegisterFormValues } from '@/features/auth/schemas';
import { useRegister } from '@/features/auth/hooks/useRegister';
import { ApiError } from '@/shared/api/api-error';
import { applyServerErrors } from '@/shared/lib/apply-server-errors';
import { useAuth } from '@/features/auth/context/useAuth';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/shared/ui/form';

export function RegisterForm() {
  const { t } = useTranslation();
  const { establishSession } = useAuth();
  const registerMutation = useRegister();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema()),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  function onSubmit(values: RegisterFormValues) {
    registerMutation.mutate(
      {
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: (response) => {
          establishSession(response);
          void router.navigate('/onboarding');
        },
        onError: (error) => {
          if (error instanceof ApiError && error.code === 'EMAIL_TAKEN') {
            form.setError('email', {
              type: 'server',
              message: t('errors.emailTaken'),
            });
            return;
          }

          applyServerErrors(form, error);
        },
      },
    );
  }

  const inputClassName =
    'h-12 rounded-xl border-[#21463c] bg-[#0c2520] px-4 ps-11 text-sm text-[#f4efe1] placeholder:text-[#6f8c81] transition-colors focus-visible:border-[#6cc4a1] focus-visible:ring-1 focus-visible:ring-[#6cc4a1]/20';

  const labelClassName = 'block text-right text-[13px] font-medium text-[#afc3ba]';

  const isEmailTaken =
    form.formState.errors.email?.type === 'server' &&
    form.formState.errors.email.message === t('errors.emailTaken');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* Full Name */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className={labelClassName}>{t('auth.fullName')}</FormLabel>

              <FormControl>
                <div className="relative">
                  <UserRound className="pointer-events-none absolute start-4 top-1/2 size-5 -translate-y-1/2 text-[#6f8c81]" />

                  <Input
                    placeholder={t('auth.fullName')}
                    autoComplete="name"
                    className={inputClassName}
                    {...field}
                  />
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className={labelClassName}>{t('auth.email')}</FormLabel>

              <FormControl>
                <div className="relative">
                  <Mail className="pointer-events-none absolute start-4 top-1/2 size-5 -translate-y-1/2 text-[#6f8c81]" />

                  <Input
                    type="email"
                    placeholder={t('auth.email')}
                    autoComplete="email"
                    className={inputClassName}
                    {...field}
                  />
                </div>
              </FormControl>

              <FormMessage />

              {isEmailTaken && (
                <p className="text-xs leading-6 text-[#afc3ba]">
                  هل تريد تسجيل الدخول بهذا البريد؟{' '}
                  <button
                    type="button"
                    onClick={() => void router.navigate('/login')}
                    className="font-semibold text-[#e2be69] hover:text-[#f0d58c]"
                  >
                    {t('auth.login')}
                  </button>
                </p>
              )}
            </FormItem>
          )}
        />

        {/* Password Fields */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4">
          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className={labelClassName}>{t('auth.password')}</FormLabel>

                <FormControl>
                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute start-4 top-1/2 size-5 -translate-y-1/2 text-[#6f8c81]" />

                    <Input
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      className={`${inputClassName} pe-11`}
                      {...field}
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute end-1 top-1/2 size-9 -translate-y-1/2 text-[#afc3ba] hover:bg-[#173b33] hover:text-[#f4efe1]"
                      aria-label={t(showPassword ? 'auth.hidePassword' : 'auth.showPassword')}
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </Button>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className={labelClassName}>{t('auth.confirmPassword')}</FormLabel>

                <FormControl>
                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute start-4 top-1/2 size-5 -translate-y-1/2 text-[#6f8c81]" />

                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      className={`${inputClassName} pe-11`}
                      {...field}
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute end-1 top-1/2 size-9 -translate-y-1/2 text-[#afc3ba] hover:bg-[#173b33] hover:text-[#f4efe1]"
                      aria-label={t(
                        showConfirmPassword ? 'auth.hidePassword' : 'auth.showPassword',
                      )}
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      {showConfirmPassword ? <EyeOff /> : <Eye />}
                    </Button>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="h-11 w-full rounded-xl bg-[#2a8c69] text-sm font-bold text-white transition-colors hover:bg-[#3fa580] disabled:opacity-60"
          disabled={registerMutation.isPending}
        >
          {registerMutation.isPending && <Loader2 className="size-5 animate-spin" />}

          {registerMutation.isPending ? t('auth.registering') : t('auth.register')}
        </Button>

        {/* Login Link */}
        <div className="flex items-center justify-center gap-2 text-sm">
          <span className="text-[#6f8c81]">لديك حساب؟</span>

          <button
            type="button"
            onClick={() => void router.navigate('/login')}
            className="font-semibold text-[#e2be69] transition-colors hover:text-[#f0d58c]"
          >
            {t('auth.login')}
          </button>
        </div>
      </form>
    </Form>
  );
}
