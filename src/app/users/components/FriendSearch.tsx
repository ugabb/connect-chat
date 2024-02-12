"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { FieldValues, SubmitHandler, UseFormRegister, useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { User } from "@prisma/client"


interface FriendSearchProps {
    users: User[]
}

export default function FriendSearch({ users }: FriendSearchProps) {
    const form = useForm()
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data.user)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="user"
                    render={({ field }) => {
                        return (
                            <FormItem className="flex flex-col">
                                <FormLabel>Enviar pedido de amizade</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={cn(
                                                    "w-[200px] justify-between",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value
                                                    ? users.find(
                                                        (user) => user.id === field.value
                                                    )?.name
                                                    : "Select language"}
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[200px] p-0">
                                        <Command>
                                            <CommandInput
                                                placeholder="Search framework..."
                                                className="h-9"
                                            />
                                            <CommandEmpty>No framework found.</CommandEmpty>
                                            <CommandGroup>
                                                {users.map((user) => (
                                                    <CommandItem
                                                        value={user.id}
                                                        key={user.id}
                                                        onSelect={() => {
                                                            form.setValue("user", user.id)
                                                        }}
                                                    >
                                                        {user.name}
                                                        <CheckIcon
                                                            className={cn(
                                                                "ml-auto h-4 w-4",
                                                                user.id === field.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                    This is the language that will be used in the dashboard.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )
                    }
                    }
                />
                <Button type="submit">
                    Enviar pedido
                </Button>
            </form>
        </Form>
    )
}