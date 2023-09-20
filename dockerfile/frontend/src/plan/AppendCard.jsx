import CardContent from "@mui/material/CardContent";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, Card } from "@mui/material";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import StarIcon from "@mui/icons-material/Star";
import { textOverCut } from "../util/textOverCut";

export default function AppendCard({ selectedItems, setSelectedItems }) {
    const removeBtnClick = (itemToRemove) => {
        // 선택한 항목을 제외한 나머지 항목들을 유지하는 방법으로 필터링
        const updatedItems = selectedItems.filter((item) => item.contentid !== itemToRemove.contentid);
        setSelectedItems([updatedItems]);
    };

    const itemsToDisplay = selectedItems || [];

    return (
        <>
            {itemsToDisplay.map((item, index) => (
                <Card
                    key={item.contentid}
                    sx={{
                        display: "flex",
                        width: "auto",
                        height: "100px",
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: "8px",
                    }}
                >
                    <CardMedia
                        component="img"
                        sx={{
                            width: 70,
                            height: 70,
                            flexGrow: "1",
                            borderRadius: "5px",
                            marginLeft: "10px",
                        }}
                        image={item.firstimage}
                        alt={item.title}
                    />
                    <CardContent sx={{ position: "static", flexGrow: "5" }}>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                fontWeight: "bold",
                                fontSize: 10,
                            }}
                        >
                            {textOverCut(item.title, 10.8, "...")}
                        </Typography>
                        <Typography variant="div">
                            <span
                                style={{
                                    fontSize: "1px",
                                    fontWeight: "bolder",
                                    color: "skyblue",
                                    marginTop: "-2",
                                }}
                            >
                                도로명
                            </span>
                            <Typography variant="h6" sx={{ fontSize: 8.3 }}>
                                {textOverCut(item.addr1, 15, "...")}
                            </Typography>
                        </Typography>

                        <div>
                            <FavoriteIcon sx={{ fontSize: 13, color: "#F44336" }} />
                            <StarIcon sx={{ fontSize: 14, color: "#FBC02D" }} />
                        </div>
                    </CardContent>
                    <div
                        style={{
                            flexGrow: "1",
                            display: "flex",
                            flexDirection: "row-reverse",
                            justifyContent: "center",
                        }}
                    >
                        <Button
                            onClick={() => removeBtnClick(item)}
                            sx={{
                                height: "30px",
                                width: "30px",
                                padding: "0",
                                minWidth: "0",
                                marginRight: "9px",
                            }}
                        >
                            <IndeterminateCheckBoxIcon color="error" />
                        </Button>
                    </div>
                </Card>
            ))}
        </>
    );
}
