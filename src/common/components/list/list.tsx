import { HighlightOff } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Entries } from 'common/types';
import { Entry } from 'common/types/misc';

import {
    ListContainer,
    ListSubTitle,
    ListTitle,
    RemoveButton,
    SubListContainer,
} from './list.style';

export type LayoutProps = {
    title: string;
    subTitle?: string;
    entries: Entries[];
    verticle?: boolean;
    removeOnClick?: (id: number) => void;
};

export const List = ({
    title,
    subTitle,
    entries,
    verticle,
    removeOnClick,
}: LayoutProps) => {
    const removeOnClickForEntry = (entry: Entry) => () => {
        if (removeOnClick) {
            removeOnClick(entry.id);
        }
    };

    return (
        <div
            style={{
                textAlign: 'center',
                maxHeight: '40vh',
                overflow: 'auto',
                padding: '1rem',
            }}
        >
            <ListTitle>{title}</ListTitle>
            {subTitle && <ListSubTitle>{subTitle}</ListSubTitle>}
            {entries.map((entry) => (
                <ListContainer
                    verticle={verticle}
                    key={`${entry[0].header}-${entry[0].id}`}
                >
                    {entry.map((subEntry) => (
                        <SubListContainer
                            key={`${subEntry.header}-${subEntry.id}`}
                        >
                            <Typography
                                key={`${subEntry.header}-${subEntry.id}`}
                                style={{ fontWeight: 500 }}
                            >
                                {subEntry.header}
                            </Typography>

                            <Typography
                                marginBottom={2}
                                marginTop={-1}
                                key={`${subEntry.content}-${subEntry.id}`}
                            >
                                {subEntry.content}
                            </Typography>

                            {removeOnClick && (
                                <RemoveButton
                                    onClick={removeOnClickForEntry(subEntry)}
                                >
                                    <HighlightOff />
                                </RemoveButton>
                            )}
                        </SubListContainer>
                    ))}
                </ListContainer>
            ))}
        </div>
    );
};
