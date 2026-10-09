import type { GuideBlock } from "@/content/guides";

export default function GuideBlocks({ blocks }: { blocks: GuideBlock[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return (
              <p key={i} className="text-text-secondary text-lg leading-relaxed">
                {b.text}
              </p>
            );
          case "list": {
            const Tag = b.ordered ? "ol" : "ul";
            return (
              <Tag
                key={i}
                className={`${b.ordered ? "list-decimal" : "list-disc"} pl-6 space-y-2 text-text-secondary text-lg leading-relaxed`}
              >
                {b.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </Tag>
            );
          }
          case "table":
            return (
              <figure key={i} className="w-full">
                <div className="overflow-x-auto rounded-2xl border border-border-subtle bg-bg-card shadow-bento">
                  <table className="w-full text-left text-[15px]">
                    <thead>
                      <tr className="border-b border-border-subtle">
                        {b.head.map((h) => (
                          <th
                            key={h}
                            className="px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-widest text-text-secondary whitespace-nowrap"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {b.rows.map((row, r) => (
                        <tr key={r} className="border-b border-border-subtle last:border-0">
                          {row.map((cell, c) => (
                            <td
                              key={c}
                              className={`px-4 py-3 align-top ${c === 0 ? "font-medium text-text-primary" : "text-text-secondary"}`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {b.caption && (
                  <figcaption className="mt-2 text-sm text-text-secondary">{b.caption}</figcaption>
                )}
              </figure>
            );
          case "tip":
            return (
              <aside
                key={i}
                className="rounded-2xl bg-bg-card border border-border-subtle shadow-bento px-5 py-4 flex gap-3"
              >
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-text-primary pt-1 shrink-0">
                  Tip
                </span>
                <p className="text-text-secondary leading-relaxed">{b.text}</p>
              </aside>
            );
        }
      })}
    </>
  );
}
