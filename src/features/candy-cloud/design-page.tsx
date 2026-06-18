import { CandyProductCard } from "@/components/shop/candy-product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { candyProducts } from "@/features/candy-cloud/products";

export function CandyDesignPage() {
  return (
    <section className="container grid gap-10 py-12">
      <div className="grid max-w-3xl gap-3">
        <p className="text-sm font-black uppercase tracking-[0.12em] text-[var(--primary)]">Design system</p>
        <h1 className="text-[length:var(--text-h1)]">ChouShop components</h1>
        <p className="text-lg leading-8 text-[var(--text-muted)]">
          Shared visual primitives for the frontend-only Mystery Box flow.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {[
          ["Primary", "var(--primary)"],
          ["Lilac", "var(--surface-lilac)"],
          ["Peach", "var(--surface-peach)"],
          ["Mint", "var(--mint)"],
          ["Text", "var(--text-main)"],
          ["Border", "var(--border-soft)"]
        ].map(([name, value]) => (
          <div className="rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-white p-4" key={name}>
            <div className="h-20 rounded-[var(--radius-md)]" style={{ background: value }} />
            <p className="mt-3 font-black">{name}</p>
            <p className="text-sm text-[var(--text-muted)]">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-white p-5">
        <div className="flex flex-wrap gap-3">
          <Button>Primary button</Button>
          <Button variant="secondary">Secondary button</Button>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="lavender">Lavender</Badge>
          <Badge variant="mint">Mint</Badge>
          <Badge variant="peach">Peach</Badge>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <Input placeholder="Input" />
          <Select defaultValue="cute">
            <option value="cute">Cute pastel</option>
            <option value="kawaii">Kawaii</option>
          </Select>
          <Textarea placeholder="Textarea" />
          <label className="flex items-center gap-3 font-bold">
            <Checkbox defaultChecked />
            Checkbox
          </label>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {candyProducts.slice(0, 3).map((product) => (
          <CandyProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
