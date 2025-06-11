import geopandas as gpd
import networkx as nx
from shapely.geometry import LineString, MultiLineString
from geopy.distance import geodesic
import matplotlib.pyplot as plt

# Load the GeoJSON file
geojson_path = 'akron.geojson'  # Adjust path as needed
gdf = gpd.read_file(geojson_path)

# Create a connected graph with distances as weights
G = nx.Graph()

for _, row in gdf.iterrows():
    geometry = row.geometry
    if isinstance(geometry, (LineString, MultiLineString)):
        lines = [geometry] if isinstance(geometry, LineString) else geometry
        for line in lines:
            coords = list(line.coords)
            for i in range(len(coords) - 1):
                u, v = coords[i], coords[i + 1]
                distance = geodesic((u[1], u[0]), (v[1], v[0])).meters
                G.add_edge(u, v, weight=distance)

# Print summary
print(f"Number of nodes: {G.number_of_nodes()}")
print(f"Number of edges: {G.number_of_edges()}")
print("Example edges with weights:")
for u, v, data in list(G.edges(data=True))[:5]:
    print(f"{u} <-> {v}, distance: {data['weight']:.2f} meters")

# Plot only the GeoJSON map in black with no labels or axes, with line thickness based on "highway" attribute
fig, ax = plt.subplots(figsize=(10, 10))

# Define thickness based on highway type
line_widths = []
for _, row in gdf.iterrows():
    if row.get("highway") in ["motorway", "motorway-link", "primary"]:
        line_widths.append(4)
    else:
        line_widths.append(2)

gdf.plot(ax=ax, color='black', linewidth=line_widths)
ax.axis('off')
plt.savefig("geojson_map_black.svg", format="svg", bbox_inches='tight', pad_inches=0)
plt.close()