import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./input";

const formSchema = z.object({
  value: z.string().min(1, { message: "Value is required" }),
});

const MessageForm = ({ projectId }: { projectId: string }) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      value: "",
    },
  });

  const createMessage = useMutation(
    trpc.message.create.mutationOptions({
      onSuccess: () => {
        form.reset();
        queryClient.invalidateQueries(
          trpc.message.getMessages.queryOptions({ projectId })
        );
      },
      onError: (err) => {
        console.error(err.message);
      },
    })
  );

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    createMessage.mutate({
      message: data.value,
      projectId,
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full border justify-center items-center h-25 mt-2 p-4 bg-muted rounded-lg flex gap-2"
      >
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem className=" flex-1">
              <FormControl>
                <Input
                  className="h-15"
                  placeholder="Type a message..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={createMessage.isPending}>
          <ArrowRightIcon />
        </Button>
      </form>
    </Form>
  );
};

export default MessageForm;
