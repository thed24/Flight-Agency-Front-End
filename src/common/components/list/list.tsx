import { Typography } from '@mui/material';
import { SC } from 'common/components';
import { Entries } from 'common/types';
import { Entry } from 'common/types/misc';

import { ListContainer, RemoveButton, SubListContainer } from './list.style';

export type LayoutProps = {
    title: string;
    entries: Entries[];
    removeOnClick?: (id: number) => void;
};

export const List = ({ title, entries, removeOnClick }: LayoutProps) => {
    const removeOnClickForEntry = (entry: Entry) => () => {
        if (removeOnClick) {
            removeOnClick(entry.id);
        }
    };

    return (
        <div
            style={{
                height: '400px',
                width: '400px',
                textAlign: 'center',
            }}
        >
            <SC.Title>{title}</SC.Title>
            {entries.map((entry) => (
                <ListContainer key={`${entry[0].header}-${entry[0].id}`}>
                    {entry.map((subEntry) => (
                        <SubListContainer
                            key={`${subEntry.header}-${subEntry.id}`}
                        >
                            <Typography
                                key={`${subEntry.header}-${subEntry.id}`}
                                style={{ fontWeight: 'bold' }}
                            >
                                {subEntry.header}
                            </Typography>

                            <Typography
                                key={`${subEntry.content}-${subEntry.id}`}
                            >
                                {subEntry.content}
                            </Typography>

                            {removeOnClick && (
                                <RemoveButton
                                    onClick={removeOnClickForEntry(subEntry)}
                                >
                                    X
                                </RemoveButton>
                            )}
                        </SubListContainer>
                    ))}
                </ListContainer>
            ))}
        </div>
    );
};
