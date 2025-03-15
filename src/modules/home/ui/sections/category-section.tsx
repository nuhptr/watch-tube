"use client"

import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

import { trpc } from "@/trpc/client"
import { FilterCarousel } from "@/components/filter-carousel"

interface CategorySectionProps {
    categoryId?: string
}

export function CategoriesSection({ categoryId }: CategorySectionProps) {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <ErrorBoundary fallback={<p>Error...</p>}>
                <CategoriesSectionSuspense categoryId={categoryId} />
            </ErrorBoundary>
        </Suspense>
    )
}

function CategoriesSectionSuspense({ categoryId }: CategorySectionProps) {
    const [categories] = trpc.categories.getMany.useSuspenseQuery()

    const data = categories.map((category) => ({
        value: category.id,
        label: category.name,
    }))

    return <FilterCarousel value={categoryId} data={data} />
}
