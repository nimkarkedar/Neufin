"use client";

import { useEffect, useRef, useState } from "react";
import { IconSvg } from "@ds/components/Icon.jsx";
import { ScrollRow } from "@ds/components/ScrollRow.jsx";
import { icons } from "@ds/brand/icons.js";
import { VerticalCard, cardLayouts } from "@/components/sections/Cards";
import { team, type Person } from "@/lib/people";

// About, The people behind Neufin: the team as photo cards in a sideways row. A card
// doesn't leave the page (Kedar, 2026-10-31): it opens the person's details in the design
// system's dialog (photo, name, role, bio, fun fact, LinkedIn), the round arrow a plus.
// Where they studied and worked, as a logo list, comes later (Kedar).
export function TeamRow() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [person, setPerson] = useState<Person | null>(null);

  useEffect(() => {
    if (person) dialog.current?.showModal();
  }, [person]);

  return (
    <>
      <ScrollRow label="The team" className={cardLayouts.row}>
        {team.map((p) => (
          <VerticalCard key={p.name} look="photo" image={p.photo} focus={p.focus} title={p.name} text={p.role} label="more about them" onOpen={() => setPerson(p)} />
        ))}
      </ScrollRow>

      {person && (
        <dialog
          ref={dialog}
          className="dialog"
          aria-labelledby="profile-name"
          onClose={() => setPerson(null)}
          // A click on the dimmed page around the window closes it.
          onClick={(e) => e.target === dialog.current && dialog.current.close()}
        >
          <button type="button" className="dialog-close" aria-label="Close" onClick={() => dialog.current?.close()}>
            <IconSvg icon={icons.close} size={24} />
          </button>
          <div className="profile">
            <div className="profile-photo">{person.photo && <img src={person.photo.src} alt="" style={{ objectPosition: person.focus }} />}</div>
            <div className="profile-body">
              <h2 id="profile-name" className="profile-name">
                {person.name}
              </h2>
              <p className="profile-role">{person.role}</p>
              {/* TODO: Pratik Mitra's bio and fun fact. */}
              <p className="profile-bio">{person.bio ?? "Bio to come."}</p>
              {person.funFact && (
                <div className="profile-fact">
                  <h3>Fun fact</h3>
                  <p>{person.funFact}</p>
                </div>
              )}
              {person.linkedin && (
                <a href={person.linkedin} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                  <IconSvg icon={icons.linkedin} size={20} />
                  View LinkedIn profile
                  <span className="visually-hidden"> of {person.name} (opens in a new tab)</span>
                </a>
              )}
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}
